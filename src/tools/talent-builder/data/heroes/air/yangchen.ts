import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const yangchenTree = createHero({
    iconImage: "/images/talent-builder/heroes/yangchen_icon.png",
    title: "Yangchen - Compassionate Avatar",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Air, HeroCategory.Avatar],
})