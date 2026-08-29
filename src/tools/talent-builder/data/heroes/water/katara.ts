import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kataraTree = createHero({
    iconImage: "/images/talent-builder/heroes/katara_icon.png",
    title: "Katara - Waterbending Master",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Hunt, HeroCategory.Water, HeroCategory.Support],
})